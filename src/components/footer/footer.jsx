export default function Footer() {
  return (
    <>
      <footer className="footer sm:footer-horizontal bg-white text-black items-center p-4">
        <aside className="grid-flow-col items-center">
          <p className="font-bold text-black">
            © {new Date().getFullYear()} URTIM KALIP VE İSKELE SİSTEMLERİ SAN.
            ve TİC. A.Ş.
          </p>
        </aside>
        <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          <a
            className="font-bold hover:text-blue-600"
            href="https://www.facebook.com/urtimglobal/?fref=ts"
            target="_blank">
            <i class="fa-brands fa-facebook text-3xl"></i>
          </a>
          <a
            className="font-bold hover:text-pink-400"
            href="https://www.instagram.com/urtimglobal/"
            target="_blank">
            <i class="fa-brands fa-square-instagram text-3xl"></i>
          </a>
          <a
            className="font-bold hover:text-blue-600"
            href="https://www.linkedin.com/company/urtim/posts/?feedView=all"
            target="_blank">
            <i class="fa-brands fa-linkedin text-3xl"></i>
          </a>
          <a
            className="font-bold hover:text-red-600"
            href="https://www.youtube.com/user/UrtimGlobal"
            target="_blank">
            <i class="fa-brands fa-youtube text-3xl"></i>
          </a>
        </nav>
      </footer>
    </>
  );
}
