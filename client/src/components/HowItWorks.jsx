const HowItWorks = ({ open, setOpen }) => {
  return (
    <div
      className={`
        fixed inset-0
        flex justify-center items-center
        transition-all duration-500

        ${open ? "opacity-100 visible" : "opacity-0 invisible"}
      `}
    >

      <div
        onClick={() => setOpen(false)}
        className="
          absolute inset-0
          bg-black/40
          backdrop-blur-sm
        "
      />

      <div
        className={`
          relative

          w-125
          p-8
          rounded-3xl

          bg-white/10
          backdrop-blur-2xl
          border border-white/20

          transition-all duration-500

          ${open ? "translate-y-0 opacity-100" : "-translate-y-40 opacity-0"}
        `}
      >
        <h1 className="text-3xl text-white font-bold mb-4">How It Works</h1>

        <p className="text-white/80">
            <ul>
                <li>Upload your image</li>
                <li>Select photo count</li>
                <li>Image will be processed and cropped</li>
                <li>It will be arranged in a printable format</li>
                <li>Download your printable PDF</li>
            </ul>
        </p>
      </div>
    </div>
  );
};

export default HowItWorks;
