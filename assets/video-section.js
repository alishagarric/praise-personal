class VideoSection extends HTMLElement {
  constructor() {
    super();

    this.background = this.dataset.initMode !== "template";

    if (this.background) {
      theme.initWhenVisible({
        element: this,
        callback: this.init.bind(this),
        threshold: 600,
      });
    } else {
      this.init();
    }
  }

  init() {
    this.parentSelector = this.dataset.parent || ".media-wrapper";
    this.parent = this.closest(this.parentSelector);

    switch (this.dataset.type) {
      case "youtube":
        this.initYoutubeVideo();
        break;

      case "vimeo":
        this.initVimeoVideo();
        break;

      case "mp4":
        this.initMp4Video();
        break;
    }
  }

  initYoutubeVideo() {
    console.log("initYoutubeVideo");
    this.setAsLoading();
    this.loadScript("youtube").then(this.setupYoutubePlayer.bind(this));
  }

  initVimeoVideo() {
    this.setAsLoading();
    this.loadScript("vimeo").then(this.setupVimeoPlayer.bind(this));
  }

  initMp4Video() {
    const player = this.querySelector("video");

    if (player) {
      const promise = player.play();

      // Edge does not return a promise (video still plays)
      if (typeof promise !== "undefined") {
        promise
          .then(function () {
            // playback normal
          })
          .catch(function () {
            player.setAttribute("controls", "");
          });
      }
    }
  }

  loadScript(videoType) {
    console.log("loadScript");
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      document.body.appendChild(script);
      script.onload = resolve;
      script.onerror = reject;
      script.async = true;
      script.src =
        videoType === "youtube"
          ? "//www.youtube.com/iframe_api"
          : "//player.vimeo.com/api/player.js";
    });
  }

  setAsLoading() {
    this.parent.setAttribute("loading", true);
  }

  setAsLoaded() {
    this.parent.removeAttribute("loading");
    this.parent.setAttribute("loaded", true);
  }

  setupYoutubePlayer() {
    console.log("setupYoutubePlayer");
    const videoId = this.dataset.videoId;

    const playerInterval = setInterval(() => {
      if (window.YT) {
        console.log("windowYT");
        window.YT.ready(() => {
          const element = document.createElement("div");
          this.appendChild(element);

          this.player = new YT.Player(element, {
            videoId: videoId,
            playerVars: {
              showinfo: 0,
              controls: !this.background,
              fs: !this.background,
              rel: 0,
              height: "100%",
              width: "100%",
              iv_load_policy: 3,
              html5: 1,
              loop: 1,
              playsinline: 1,
              modestbranding: 1,
              disablekb: 1,
            },
            events: {
              onReady: this.onYoutubeReady.bind(this),
              onStateChange: this.onYoutubeStateChange.bind(this),
            },
          });
          clearInterval(playerInterval);
        });
      }
    }, 50);
  }

  onYoutubeReady() {
    console.log("youtube ready");
    this.iframe = this.querySelector("iframe"); // iframe once YT loads
    this.iframe.setAttribute("tabindex", "-1");

    this.background && this.player.mute();
    if (typeof this.player.playVideo === "function") this.player.playVideo();

    this.setAsLoaded();

    // pause when out of view
    const observer = new IntersectionObserver(
      (entries, _observer) => {
        entries.forEach((entry) => {
          entry.isIntersecting ? this.youtubePlay() : this.youtubePause();
        });
      },
      { rootMargin: "0px 0px 50px 0px" }
    );

    observer.observe(this.iframe);
  }

  onYoutubeStateChange(event) {
    switch (event.data) {
      case -1: // unstarted
        // Handle low power state on iOS by checking if
        // video is reset to unplayed after attempting to buffer
        if (this.attemptedToPlay) {
          this.setAsLoaded();
          this.closest(".banner").classList.add("video-interactable");
        }
        break;
      case 0: // ended, loop it
        this.youtubePlay();
        break;
      case 1: // playing
        this.setAsLoaded();
        break;
      case 3: // buffering
        this.attemptedToPlay = true;
        break;
    }
  }

  youtubePlay() {
    if (
      this.background &&
      this.player &&
      typeof this.player.playVideo === "function"
    ) {
      this.player.playVideo();
    }
  }

  youtubePause() {
    if (
      this.background &&
      this.player &&
      typeof this.player.pauseVideo === "function"
    ) {
      this.player.pauseVideo();
    }
  }

  setupVimeoPlayer() {
    const videoId = this.dataset.videoId;

    const playerInterval = setInterval(() => {
      if (window.Vimeo) {
        this.player = new Vimeo.Player(this, {
          id: videoId,
          autoplay: true,
          autopause: false,
          background: this.background,
          controls: !this.background,
          loop: true,
          height: "100%",
          width: "100%",
        });
        this.player.ready().then(this.onVimeoReady.bind(this));

        clearInterval(playerInterval);
      }
    }, 50);
  }

  onVimeoReady() {
    this.iframe = this.querySelector("iframe");
    this.iframe.setAttribute("tabindex", "-1");

    this.background && this.player.setMuted(true);

    this.setAsLoaded();

    // pause when out of view
    const observer = new IntersectionObserver(
      (entries, _observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.vimeoPlay();
          } else {
            this.vimeoPause();
          }
        });
      },
      { rootMargin: "0px 0px 50px 0px" }
    );

    observer.observe(this.iframe);
  }

  vimeoPlay() {
    if (
      this.background &&
      this.player &&
      typeof this.player.play === "function"
    ) {
      this.player.play();
    }
  }

  vimeoPause() {
    if (
      this.background &&
      this.player &&
      typeof this.player.pause === "function"
    ) {
      this.player.pause();
    }
  }
}
customElements.define("video-section", VideoSection);
