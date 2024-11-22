function Teaser() {
  return (
    <>
      <div className="flex flex-col w-full h-screen items-center justify-center">
        <iframe
          className="mb-10 left-0 w-full h-full"
          width="60%"
          height="77%"
          src="https://www.youtube.com/embed/GsCvjcwcSHY?si=66s8ZTMi50fw3ITp"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
    </>
  );
}

export default Teaser;
