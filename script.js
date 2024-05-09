// Getting locomotive through codepen locomotive js code

function loco() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
loco();

// break para words into a span tag for animation

var clutter = "";

document
  .querySelector("#section-2 p")
  .textContent.split(" ")
  .forEach((word) => {
    clutter += `<span>${word}</span> `;

    document.querySelector("#section-2 p").innerHTML = clutter;
  });

gsap.to("#section-2 p span", {
  scrollTrigger: {
    trigger: `#section-2 p span`,
    scroller: `#main`,
    start: `top bottom`,
    end: `bottom top`,
    scrub: 0.2,
    // markers: true,
  },
  color: `#fff`,
  stagger: 0.2,
});

// canvas code
function canvas() {
  const canvas = document.querySelector("#section-3>canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  function files(index) {
    var data = `
  ./Images/home/building/frames00007.png
  ./Images/home/building/frames00010.png
  ./Images/home/building/frames00013.png
  ./Images/home/building/frames00016.png
  ./Images/home/building/frames00019.png
  ./Images/home/building/frames00022.png
  ./Images/home/building/frames00025.png
  ./Images/home/building/frames00028.png
  ./Images/home/building/frames00031.png
  ./Images/home/building/frames00034.png
  ./Images/home/building/frames00037.png
  ./Images/home/building/frames00040.png
  ./Images/home/building/frames00043.png
  ./Images/home/building/frames00046.png
  ./Images/home/building/frames00049.png
  ./Images/home/building/frames00052.png
  ./Images/home/building/frames00055.png
  ./Images/home/building/frames00058.png
  ./Images/home/building/frames00061.png
  ./Images/home/building/frames00064.png
  ./Images/home/building/frames00067.png
  ./Images/home/building/frames00070.png
  ./Images/home/building/frames00073.png
  ./Images/home/building/frames00076.png
  ./Images/home/building/frames00079.png
  ./Images/home/building/frames00082.png
  ./Images/home/building/frames00085.png
  ./Images/home/building/frames00088.png
  ./Images/home/building/frames00091.png
  ./Images/home/building/frames00094.png
  ./Images/home/building/frames00097.png
  ./Images/home/building/frames00100.png
  ./Images/home/building/frames00103.png
  ./Images/home/building/frames00106.png
  ./Images/home/building/frames00109.png
  ./Images/home/building/frames00112.png
  ./Images/home/building/frames00115.png
  ./Images/home/building/frames00118.png
  ./Images/home/building/frames00121.png
  ./Images/home/building/frames00124.png
  ./Images/home/building/frames00127.png
  ./Images/home/building/frames00130.png
  ./Images/home/building/frames00133.png
  ./Images/home/building/frames00136.png
  ./Images/home/building/frames00139.png
  ./Images/home/building/frames00142.png
  ./Images/home/building/frames00145.png
  ./Images/home/building/frames00148.png
  ./Images/home/building/frames00151.png
  ./Images/home/building/frames00154.png
  ./Images/home/building/frames00157.png
  ./Images/home/building/frames00160.png
  ./Images/home/building/frames00163.png
  ./Images/home/building/frames00166.png
  ./Images/home/building/frames00169.png
  ./Images/home/building/frames00172.png
  ./Images/home/building/frames00175.png
  ./Images/home/building/frames00178.png
  ./Images/home/building/frames00181.png
  ./Images/home/building/frames00184.png
  ./Images/home/building/frames00187.png
  ./Images/home/building/frames00190.png
  ./Images/home/building/frames00193.png
  ./Images/home/building/frames00196.png
  ./Images/home/building/frames00199.png
  ./Images/home/building/frames00202.png
 `;
    return data.split("\n")[index];
  }

  const frameCount = 66;

  const images = [];
  const imageSeq = {
    frame: 1,
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: `none`,
    scrollTrigger: {
      scrub: 0.15,
      trigger: `#section-3>canvas`,
      //   set start end according to preference
      start: `top top`,
      end: `600% top`,
      scroller: `#main`,
    },
    onUpdate: render,
  });

  images[1].onload = render;

  function render() {
    scaleImage(images[imageSeq.frame], context);
  }

  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }
  ScrollTrigger.create({
    trigger: "#section-3",
    pin: true,
    // markers:true,
    scroller: `#main`,
    //   set start end according to preference
    start: `top top`,
    end: `600% top`,
  });
}
canvas();

// Same for section-4
var clutter = "";

document
  .querySelector("#section-4 h1")
  .textContent.split(" ")
  .forEach((word) => {
    clutter += `<span>${word}</span> `;

    document.querySelector("#section-4 h1").innerHTML = clutter;
  });

gsap.to("#section-4 h1 span", {
  scrollTrigger: {
    trigger: `#section-4 h1 span`,
    scroller: `#main`,
    start: `top bottom`,
    end: `bottom top`,
    scrub: 0.2,
    // markers: true,
  },
  color: `#fff`,
  stagger: 0.2,
});

// Canvas section-5 same

function canvas1() {
  const canvas = document.querySelector("#section-5>canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  function files(index) {
    var data = `
  ./Images/home/bridges/bridges00004.png
  ./Images/home/bridges/bridges00007.png
  ./Images/home/bridges/bridges00010.png
  ./Images/home/bridges/bridges00013.png
  ./Images/home/bridges/bridges00016.png
  ./Images/home/bridges/bridges00019.png
  ./Images/home/bridges/bridges00022.png
  ./Images/home/bridges/bridges00025.png
  ./Images/home/bridges/bridges00028.png
  ./Images/home/bridges/bridges00031.png
  ./Images/home/bridges/bridges00034.png
  ./Images/home/bridges/bridges00037.png
  ./Images/home/bridges/bridges00040.png
  ./Images/home/bridges/bridges00043.png
  ./Images/home/bridges/bridges00046.png
  ./Images/home/bridges/bridges00049.png
  ./Images/home/bridges/bridges00052.png
  ./Images/home/bridges/bridges00055.png
  ./Images/home/bridges/bridges00058.png
  ./Images/home/bridges/bridges00061.png
  ./Images/home/bridges/bridges00064.png
  ./Images/home/bridges/bridges00067.png
  ./Images/home/bridges/bridges00070.png
  ./Images/home/bridges/bridges00073.png
  ./Images/home/bridges/bridges00076.png
  ./Images/home/bridges/bridges00079.png
  ./Images/home/bridges/bridges00082.png
  ./Images/home/bridges/bridges00085.png
  ./Images/home/bridges/bridges00088.png
  ./Images/home/bridges/bridges00091.png
  ./Images/home/bridges/bridges00094.png
  ./Images/home/bridges/bridges00097.png
  ./Images/home/bridges/bridges00100.png
  ./Images/home/bridges/bridges00103.png
  ./Images/home/bridges/bridges00106.png
  ./Images/home/bridges/bridges00109.png
  ./Images/home/bridges/bridges00112.png
  ./Images/home/bridges/bridges00115.png
  ./Images/home/bridges/bridges00118.png
  ./Images/home/bridges/bridges00121.png
  ./Images/home/bridges/bridges00124.png
  ./Images/home/bridges/bridges00127.png
  ./Images/home/bridges/bridges00130.png
  ./Images/home/bridges/bridges00133.png
  ./Images/home/bridges/bridges00136.png
  ./Images/home/bridges/bridges00139.png
  ./Images/home/bridges/bridges00142.png
  ./Images/home/bridges/bridges00145.png
  ./Images/home/bridges/bridges00148.png
  ./Images/home/bridges/bridges00151.png
  ./Images/home/bridges/bridges00154.png
  ./Images/home/bridges/bridges00157.png
  ./Images/home/bridges/bridges00160.png
  ./Images/home/bridges/bridges00163.png
 `;
    return data.split("\n")[index];
  }

  const frameCount = 54;

  const images = [];
  const imageSeq = {
    frame: 1,
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: `none`,
    scrollTrigger: {
      scrub: 0.15,
      trigger: `#section-5>canvas`,
      //   set start end according to preference
      start: `top top`,
      end: `600% top`,
      scroller: `#main`,
    },
    onUpdate: render,
  });

  images[1].onload = render;

  function render() {
    scaleImage(images[imageSeq.frame], context);
  }

  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }
  ScrollTrigger.create({
    trigger: "#section-5",
    pin: true,
    // markers:true,
    scroller: `#main`,
    //   set start end according to preference
    start: `top top`,
    end: `600% top`,
  });
}
canvas1();

// Same for section-6
var clutter = "";

document
  .querySelector("#section-6 h1")
  .textContent.split(" ")
  .forEach((word) => {
    clutter += `<span>${word}</span> `;

    document.querySelector("#section-6 h1").innerHTML = clutter;
  });

gsap.to("#section-6 h1 span", {
  scrollTrigger: {
    trigger: `#section-6 h1 span`,
    scroller: `#main`,
    start: `top bottom`,
    end: `bottom top`,
    scrub: 0.2,
    // markers: true,
  },
  color: `#fff`,
  stagger: 0.2,
});

// Canvas section-7 Same
function canvas2() {
  const canvas = document.querySelector("#section-7>canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  function files(index) {
    var data = `

https://thisismagma.com/assets/home/lore/seq/1.webp?2
https://thisismagma.com/assets/home/lore/seq/2.webp?2
https://thisismagma.com/assets/home/lore/seq/3.webp?2
https://thisismagma.com/assets/home/lore/seq/4.webp?2
https://thisismagma.com/assets/home/lore/seq/5.webp?2
https://thisismagma.com/assets/home/lore/seq/6.webp?2
https://thisismagma.com/assets/home/lore/seq/7.webp?2
https://thisismagma.com/assets/home/lore/seq/8.webp?2
https://thisismagma.com/assets/home/lore/seq/9.webp?2
https://thisismagma.com/assets/home/lore/seq/10.webp?2
https://thisismagma.com/assets/home/lore/seq/11.webp?2
https://thisismagma.com/assets/home/lore/seq/12.webp?2
https://thisismagma.com/assets/home/lore/seq/13.webp?2
https://thisismagma.com/assets/home/lore/seq/14.webp?2
https://thisismagma.com/assets/home/lore/seq/15.webp?2
https://thisismagma.com/assets/home/lore/seq/16.webp?2
https://thisismagma.com/assets/home/lore/seq/17.webp?2
https://thisismagma.com/assets/home/lore/seq/18.webp?2
https://thisismagma.com/assets/home/lore/seq/19.webp?2
https://thisismagma.com/assets/home/lore/seq/20.webp?2
https://thisismagma.com/assets/home/lore/seq/21.webp?2
https://thisismagma.com/assets/home/lore/seq/22.webp?2
https://thisismagma.com/assets/home/lore/seq/23.webp?2
https://thisismagma.com/assets/home/lore/seq/24.webp?2
https://thisismagma.com/assets/home/lore/seq/25.webp?2
https://thisismagma.com/assets/home/lore/seq/26.webp?2
https://thisismagma.com/assets/home/lore/seq/27.webp?2
https://thisismagma.com/assets/home/lore/seq/28.webp?2
https://thisismagma.com/assets/home/lore/seq/29.webp?2
https://thisismagma.com/assets/home/lore/seq/30.webp?2
https://thisismagma.com/assets/home/lore/seq/31.webp?2
https://thisismagma.com/assets/home/lore/seq/32.webp?2
https://thisismagma.com/assets/home/lore/seq/33.webp?2
https://thisismagma.com/assets/home/lore/seq/34.webp?2
https://thisismagma.com/assets/home/lore/seq/35.webp?2
https://thisismagma.com/assets/home/lore/seq/36.webp?2
https://thisismagma.com/assets/home/lore/seq/37.webp?2
https://thisismagma.com/assets/home/lore/seq/38.webp?2
https://thisismagma.com/assets/home/lore/seq/39.webp?2
https://thisismagma.com/assets/home/lore/seq/40.webp?2
https://thisismagma.com/assets/home/lore/seq/41.webp?2
https://thisismagma.com/assets/home/lore/seq/42.webp?2
https://thisismagma.com/assets/home/lore/seq/43.webp?2
https://thisismagma.com/assets/home/lore/seq/44.webp?2
https://thisismagma.com/assets/home/lore/seq/45.webp?2
https://thisismagma.com/assets/home/lore/seq/46.webp?2
https://thisismagma.com/assets/home/lore/seq/47.webp?2
https://thisismagma.com/assets/home/lore/seq/48.webp?2
https://thisismagma.com/assets/home/lore/seq/49.webp?2
https://thisismagma.com/assets/home/lore/seq/50.webp?2
https://thisismagma.com/assets/home/lore/seq/51.webp?2
https://thisismagma.com/assets/home/lore/seq/52.webp?2
https://thisismagma.com/assets/home/lore/seq/53.webp?2
https://thisismagma.com/assets/home/lore/seq/54.webp?2
https://thisismagma.com/assets/home/lore/seq/55.webp?2
https://thisismagma.com/assets/home/lore/seq/56.webp?2
https://thisismagma.com/assets/home/lore/seq/57.webp?2
https://thisismagma.com/assets/home/lore/seq/58.webp?2
https://thisismagma.com/assets/home/lore/seq/59.webp?2
https://thisismagma.com/assets/home/lore/seq/60.webp?2
https://thisismagma.com/assets/home/lore/seq/61.webp?2
https://thisismagma.com/assets/home/lore/seq/62.webp?2
https://thisismagma.com/assets/home/lore/seq/63.webp?2
https://thisismagma.com/assets/home/lore/seq/64.webp?2
https://thisismagma.com/assets/home/lore/seq/65.webp?2
https://thisismagma.com/assets/home/lore/seq/66.webp?2
https://thisismagma.com/assets/home/lore/seq/67.webp?2
https://thisismagma.com/assets/home/lore/seq/68.webp?2
https://thisismagma.com/assets/home/lore/seq/69.webp?2
https://thisismagma.com/assets/home/lore/seq/70.webp?2
https://thisismagma.com/assets/home/lore/seq/71.webp?2
https://thisismagma.com/assets/home/lore/seq/72.webp?2
https://thisismagma.com/assets/home/lore/seq/73.webp?2
https://thisismagma.com/assets/home/lore/seq/74.webp?2
https://thisismagma.com/assets/home/lore/seq/75.webp?2
https://thisismagma.com/assets/home/lore/seq/76.webp?2
https://thisismagma.com/assets/home/lore/seq/77.webp?2
https://thisismagma.com/assets/home/lore/seq/78.webp?2
https://thisismagma.com/assets/home/lore/seq/79.webp?2
https://thisismagma.com/assets/home/lore/seq/80.webp?2
https://thisismagma.com/assets/home/lore/seq/81.webp?2
https://thisismagma.com/assets/home/lore/seq/82.webp?2
https://thisismagma.com/assets/home/lore/seq/83.webp?2
https://thisismagma.com/assets/home/lore/seq/84.webp?2
https://thisismagma.com/assets/home/lore/seq/85.webp?2
https://thisismagma.com/assets/home/lore/seq/86.webp?2
https://thisismagma.com/assets/home/lore/seq/87.webp?2
https://thisismagma.com/assets/home/lore/seq/88.webp?2
https://thisismagma.com/assets/home/lore/seq/89.webp?2
https://thisismagma.com/assets/home/lore/seq/90.webp?2
https://thisismagma.com/assets/home/lore/seq/91.webp?2
https://thisismagma.com/assets/home/lore/seq/92.webp?2
https://thisismagma.com/assets/home/lore/seq/93.webp?2
https://thisismagma.com/assets/home/lore/seq/94.webp?2
https://thisismagma.com/assets/home/lore/seq/95.webp?2
https://thisismagma.com/assets/home/lore/seq/96.webp?2
https://thisismagma.com/assets/home/lore/seq/97.webp?2
https://thisismagma.com/assets/home/lore/seq/98.webp?2
https://thisismagma.com/assets/home/lore/seq/99.webp?2
https://thisismagma.com/assets/home/lore/seq/100.webp?2
https://thisismagma.com/assets/home/lore/seq/101.webp?2
https://thisismagma.com/assets/home/lore/seq/102.webp?2
https://thisismagma.com/assets/home/lore/seq/103.webp?2
https://thisismagma.com/assets/home/lore/seq/104.webp?2
https://thisismagma.com/assets/home/lore/seq/105.webp?2
https://thisismagma.com/assets/home/lore/seq/106.webp?2
https://thisismagma.com/assets/home/lore/seq/107.webp?2
https://thisismagma.com/assets/home/lore/seq/108.webp?2
https://thisismagma.com/assets/home/lore/seq/109.webp?2
https://thisismagma.com/assets/home/lore/seq/110.webp?2
https://thisismagma.com/assets/home/lore/seq/111.webp?2
https://thisismagma.com/assets/home/lore/seq/112.webp?2
https://thisismagma.com/assets/home/lore/seq/113.webp?2
https://thisismagma.com/assets/home/lore/seq/114.webp?2
https://thisismagma.com/assets/home/lore/seq/115.webp?2
https://thisismagma.com/assets/home/lore/seq/116.webp?2
https://thisismagma.com/assets/home/lore/seq/117.webp?2
https://thisismagma.com/assets/home/lore/seq/118.webp?2
https://thisismagma.com/assets/home/lore/seq/119.webp?2
https://thisismagma.com/assets/home/lore/seq/120.webp?2
https://thisismagma.com/assets/home/lore/seq/121.webp?2
https://thisismagma.com/assets/home/lore/seq/122.webp?2
https://thisismagma.com/assets/home/lore/seq/123.webp?2
https://thisismagma.com/assets/home/lore/seq/124.webp?2
https://thisismagma.com/assets/home/lore/seq/125.webp?2
https://thisismagma.com/assets/home/lore/seq/126.webp?2
https://thisismagma.com/assets/home/lore/seq/127.webp?2
https://thisismagma.com/assets/home/lore/seq/128.webp?2
https://thisismagma.com/assets/home/lore/seq/129.webp?2
https://thisismagma.com/assets/home/lore/seq/130.webp?2
https://thisismagma.com/assets/home/lore/seq/131.webp?2
https://thisismagma.com/assets/home/lore/seq/132.webp?2
https://thisismagma.com/assets/home/lore/seq/133.webp?2
https://thisismagma.com/assets/home/lore/seq/134.webp?2
https://thisismagma.com/assets/home/lore/seq/135.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2

`;
    return data.split("\n")[index];
  }

  const frameCount = 136;

  const images = [];
  const imageSeq = {
    frame: 1,
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: `none`,
    scrollTrigger: {
      scrub: 0.5,
      trigger: `#section-7`,
      start: `top top`,
      end: `250% top`,
      scroller: `#main`,
    },
    onUpdate: render,
  });

  images[1].onload = render;

  function render() {
    scaleImage(images[imageSeq.frame], context);
  }

  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }
  ScrollTrigger.create({
    trigger: "#section-7",
    pin: true,
    scroller: `#main`,
    start: `top top`,
    end: `250% top`,
  });
}
canvas2();

// gsap circle section-7

gsap.to(".sec7-cir", {
  scrollTrigger: {
    trigger: `.sec7-cir`,
    start: `top center`,
    end: `bottom top`,
    scroller: `#main`,
    // markers: true,
    scrub: 0.5,
  },
  scale: 1.5,
});

gsap.to(".sec7-inner-cir", {
  scrollTrigger: {
    trigger: `.sec7-inner-cir`,
    start: `top center`,
    end: `bottom top`,
    scroller: `#main`,
    // markers: true,
    scrub: 0.5,
  },
  backgroundColor: `#0842e076`,
});

// text fade section 8

gsap.to(".sec8-info", {
  opacity: 1,
  duration: 0.1,
  scrollTrigger: {
    trigger: ".sec8-info",
    start: `top center`,
    end: `bottom center`,
    scroller: `#main`,
    scrub: 0.5,
    toggleActions: "play none none reverse",
  },
});

gsap.to("#section-7", {
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: "#section-7",
    start: "top end",
    end: "bottom end",
    scrub: true,
  },
});

gsap.from("#section-8", {
  opacity: 0,
  duration: 2,
  zIndex: 1,
  scrollTrigger: {
    trigger: "#section-8",
    start: "top bottom",
    end: "center bottom",
    scroller: `#main`,
    scrub: true,
  },
});
