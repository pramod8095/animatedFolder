const folders = [...document.querySelectorAll(".folder")];
const folderWrappers = [...document.querySelectorAll(".folder-wrapper")];
const previewImagesAll = [...document.querySelectorAll(".folder-preview-img")];

let isMobile = window.innerWidth < 1000;

function setInitialPositions() {
  gsap.set(folderWrappers, { y: isMobile ? 0 : 25 });
  gsap.set(previewImagesAll, { y: "0%", rotation: 0 });
  folders.forEach((folder) => folder.classList.remove("disabled"));
}

function handleEnter(folder, index) {
  if (isMobile) return;

  const images = folder.querySelectorAll(".folder-preview-img");

  folders.forEach((f) => {
    if (f !== folder) f.classList.add("disabled");
  });

  gsap.to(folderWrappers[index], {
    y: 0,
    duration: 0.25,
    ease: "back.out(1.7)",
  });

  images.forEach((img, i) => {
    const rotation =
      i === 0
        ? gsap.utils.random(-20, -10)
        : i === 1
          ? gsap.utils.random(-10, 10)
          : gsap.utils.random(10, 20);

    gsap.to(img, {
      y: "-100%",
      rotation,
      duration: 0.25,
      ease: "back.out(1.7)",
      delay: i * 0.025,
    });
  });
}

function handleLeave(index) {
  if (isMobile) return;

  const images = folders[index].querySelectorAll(".folder-preview-img");

  folders.forEach((f) => f.classList.remove("disabled"));

  gsap.to(folderWrappers[index], {
    y: 25,
    duration: 0.25,
    ease: "back.out(1.7)",
  });

  images.forEach((img, i) => {
    gsap.to(img, {
      y: "0%",
      rotation: 0,
      duration: 0.25,
      ease: "back.out(1.7)",
      delay: i * 0.05,
    });
  });
}

folders.forEach((folder, index) => {
  folder.addEventListener("mouseenter", () => handleEnter(folder, index));
  folder.addEventListener("mouseleave", () => handleLeave(index));
});

window.addEventListener("resize", () => {
  const newIsMobile = window.innerWidth < 1000;

  if (newIsMobile !== isMobile) {
    isMobile = newIsMobile;
    setInitialPositions();
  }
});

setInitialPositions();
