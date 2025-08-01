import SignNReg from "./Sign-in_and_Registration";

export default function Hero() {
  return (
    <>
      <div className="hero min-h-198.5 bg-[url(src/assets/urtim_fabrika.png)]">
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <SignNReg />
        </div>
      </div>
    </>
  );
}
