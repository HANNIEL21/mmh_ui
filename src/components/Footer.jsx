import logo from "../assets/logo.png"

export default function Footer() {
    return (
        <footer className="bg-[#8F1E63] bg-opacity-10 p-10">
            <section className="flex flex-col md:flex-row justify-evenly px-12">
                <div>
                    <img src={logo} height={100} width={100} alt="hospital logo" />
                </div>
                <div>
                    <h2 className="capitalize font-bold text-2xl">quick links</h2>
                    <ul className="capitalize font-semibold ">
                        <li>home</li>
                        <li>about</li>
                        <li>services</li>
                        <li>contact</li>
                        <li>appointment</li>
                    </ul>
                </div>
                <div>
                    <h2 className="capitalize font-bold text-2xl">Services</h2>
                    <ul className="capitalize">
                        <li>general medicine</li>
                        <li>surgery</li>
                        <li>obstetrics and gynecology</li>
                        <li>pediatrics</li>
                        <li>laboratory services</li>
                        <li>Pharmacy</li>
                    </ul>
                </div>
                <div>
                    <h2 className="capitalize font-bold text-2xl">location</h2>
                    <p><span>Address:</span></p>
                    <p><span>phone:</span></p>
                    <p><span>Email:</span></p>
                    <p><span>Social:</span></p>
                </div>
            </section>
            <section>

            </section>
        </footer>
    );
}