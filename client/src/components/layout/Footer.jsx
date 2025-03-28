import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
          <div className="w-full md:w-1/3">
            <h3 className="text-xl font-bold mb-4">О компании</h3>
            <p className="text-gray-400">
              Simple blog... Without anything unnecessary.
            </p>
          </div>

          {/* Навигационные ссылки */}
          <div className="w-full md:w-1/4">
            <h3 className="text-xl font-bold mb-4">Links</h3>
            <ul className="space-y-2">
              {[{'name':'Main', 'path':'/'}, {'name':'About', 'path':'about'}, {'name':'Contacts', 'path':'/contacts'}].map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.path}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full md:w-1/4">
            <h3 className="text-xl font-bold mb-4">Contacts</h3>
            <ul className="space-y-2 text-gray-400">
              <li>dongohago@gmail.com</li>
              <li>myblog.com</li>
            </ul>
          </div>
        </div>

        {/* Копирайт и соцсети */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-center">
            © {new Date().getFullYear()} MyBlog.com. All rights reserved.
          </div>
          
          <div className="flex space-x-4">
            {['Facebook', 'Twitter', 'Instagram'].map((network) => (
              <a 
                key={network}
                href="#" 
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                {network}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
