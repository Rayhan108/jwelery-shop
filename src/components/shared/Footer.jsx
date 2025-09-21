import { FaInstagram, FaPinterestP, FaTiktok } from "react-icons/fa";
import { RiTelegram2Fill, RiYoutubeLine } from "react-icons/ri";
import { SlSocialFacebook } from "react-icons/sl";
import { FaXTwitter } from "react-icons/fa6";
import card1 from '../../../public/ring/visa.png'
import card2 from '../../../public/ring/money.png'
import card3 from '../../../public/ring/apple.png'
import card4 from '../../../public/ring/american.png'
import card5 from '../../../public/ring/paypal.png'
import Image from "next/image";
import Link from "next/link";
import { useGetCategoryQuery } from "@/redux/Api/webmanageApi";
import { useGetContactUsInfoQuery, useGetSocialLinksQuery } from "@/redux/Api/newApi";

const Footer = () => {
  const { data: contactInfo } = useGetContactUsInfoQuery();
  const { data: category } = useGetCategoryQuery();
  const { data: social } = useGetSocialLinksQuery();
  console.log(social);

  const categoryItems =
    (category?.slice(0, 5).map((cat) => ({
      title: cat?.name,
      path: `/${cat?._id}`,
    }))) || [];

  const iconMapping = {
    facebook: <SlSocialFacebook />,
    twitter: <FaXTwitter />,
    instagram: <FaInstagram />,
    tiktok: <FaTiktok />,
    youtube: <RiYoutubeLine />,
    pinterest: <FaPinterestP />,
    telegram: <RiTelegram2Fill />,
  };

  return (
    <div className="md:mt-28 mt-16">
      <footer className="bg-black text-white py-10 pt-20 px-4 md:px-20">
        <div className="container m-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Our Address */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Address</h3>
            <p className="flex items-center mb-2">
              <span className="mr-2">📍</span> {contactInfo?.address}
            </p>
            <p className="flex items-center mb-2">
              <span className="mr-2">📞</span> {contactInfo?.contactNumber}
            </p>
            <p className="flex items-center mb-2">
              <span className="mr-2">📧</span> {contactInfo?.email}
            </p>
            <p className="flex items-center">
              <span className="mr-2">🌐</span> www.carthysjewelry.com
            </p>
          </div>

          {/* Company & Le*/}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company & Legal</h3>
            <ul className="space-y-2">
              <li><Link href={'/aboutUs'}>About Us</Link></li>
              <li><Link href={'/faq'}>FAQs</Link></li>
              <li><Link href={'/privacyPolicy'}>Privacy Policy</Link></li>
              <li><Link href={'/termsCondition'}>Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Support</h3>
            <ul className="space-y-2">
              <li><Link href={'/helpSupport'} className=" cursor-pointer">Help & Support</Link></li>
              <li><Link href={'/shippingDelivery'} className=" cursor-pointer">Shipping & Delivery</Link></li>
              <li><Link href={'/returnExchange'} className=" cursor-pointer">Returns & Exchanges</Link></li>
              <li><Link href={'/warrantyRepair'} className=" cursor-pointer">Warranty & Repairs</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href={'/customize'} className=" cursor-pointer">Custom Jewelry</Link></li>

              {categoryItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.path} >
                    <h1 className="text-white cursor-pointer" >
                      {item.title}
                    </h1>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex gap-5 justify-center container m-auto mt-11">
          <div className="border-b-2 border-gray-600 h-2 w-full mt-2"></div>
          <div className="flex justify-center gap-3">
            {social?.map((socialItem) => {
              const { platform, url } = socialItem;
              return iconMapping[platform] ? (
                <Link key={platform} href={`${url}`} target="_blank">
                  <div className="border w-8 h-8 rounded-full flex items-center justify-center text-xl">
                    {iconMapping[platform]}
                  </div>
                </Link>
              ) : null;
            })}
          </div>
          <div className="border-b-2 border-gray-600 w-full h-2 mt-2"></div>
        </div>

        <div className="max-w-7xl mx-auto mt-6 flex flex-col md:flex-row items-center justify-between  border-gray-700 pt-6">
          <p className="text-sm">
            &copy; 2025 Carthy’s Jewelry, All rights reserved
          </p>

          <div>
            <div className="flex space-x-4">

              <Image className="bg-white w-[50px] md:w-[70px] h-[30px] md:h-[40px] rounded" width={80} height={20} src={card1} alt="Visa" />
              <Image className="bg-white w-[50px] md:w-[70px] h-[30px] md:h-[40px] rounded" width={80} height={20} src={card2} alt="Mastercard" />
              <Image className="bg-white w-[50px] md:w-[70px] h-[30px] md:h-[40px] rounded" width={80} height={20} src={card3} alt="Apple Pay" />
              <Image className="bg-white w-[50px] md:w-[70px] h-[30px] md:h-[40px] rounded" width={80} height={20} src={card4} alt="American Express" />
              <Image className="bg-white w-[50px] md:w-[70px] h-[30px] md:h-[40px] rounded" width={80} height={20} src={card5} alt="PayPal" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
