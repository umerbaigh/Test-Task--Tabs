const BannerSection = () => {
  return (
    <div className="relative ">
      <img src="/assets/bg-shadow.png" className="absolute top-0 z-0" alt="" />

      <div className="container  flex items-center justify-center py-10 text-center z-50">
        <div>
          <p className="md:text-large text-medium font-semibold ">
            Fast and <span className="text-primary">delightful</span> editing
          </p>

          <p className="md:text-medium text-sm md:leading-[30px]">
            Preview your video in the browser. Fast refresh while the video is{" "}
            <br />
            playing. Scrub through the timeline to get every frame perfect.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
