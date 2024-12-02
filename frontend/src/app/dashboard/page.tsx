'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { BsFillXDiamondFill } from 'react-icons/bs';
import { HiMenuAlt3 } from 'react-icons/hi';
import { IoSearchOutline, IoSettingsOutline } from 'react-icons/io5';
import { IoMdMenu, IoMdClose } from 'react-icons/io';
import { FaPlus } from 'react-icons/fa';
import girl from '@/assets/girl1.png';
import boy from '@/assets/girl1.png';
import icon from '@/assets/icon1.ico';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getRegisteredProductsByManufacturer } from '@/services/apiService';

type ProductDetails = {
  product_id: string;
  name: string;
  image: string;
  manufacturer: string;
  manufactureDate: string;
  expiryDate: string;
};

const AddProductModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [formData, setFormData] = useState({
    title: '',
    verification: '',
    date: null,
    role: '',
  });

  const [errors, setErrors] = useState({
    title: false,
    verification: false,
    date: false,
    role: false,
  });

  const handleInputChange = (field: string, value: string | Date | null) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: false });
  };

  const validateForm = () => {
    const newErrors = {
      title: formData.title.trim() === '',
      verification: formData.verification.trim() === '',
      date: !formData.date,
      role: formData.role === '',
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      toast.success('Event added successfully!', {
        position: 'top-right',
      });

      setFormData({
        title: '',
        verification: '',
        date: null,
        role: '',
      });
      onClose();
    } else {
      toast.error('Please fill in all the required fields!', {
        position: 'top-right',
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-lg md:max-w-xl sm:mx-4 rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between border-b pb-3">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <FaPlus className="text-black" />
            Add Product
          </h2>
          <button onClick={onClose}>
            <IoMdClose size={24} className="text-black" />
          </button>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleFormSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Check Title
            </label>
            <input
              type="text"
              placeholder="Enter check title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={`w-full px-3 py-2 border ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">Title is required.</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Verification
            </label>
            <input
              type="text"
              placeholder="Enter verification"
              value={formData.verification}
              onChange={(e) =>
                handleInputChange('verification', e.target.value)
              }
              className={`w-full px-3 py-2 border ${
                errors.verification ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600`}
            />
            {errors.verification && (
              <p className="text-red-500 text-sm">Verification is required.</p>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <DatePicker
                selected={formData.date}
                onChange={(date) => handleInputChange('date', date)}
                className={`w-full px-3 py-2 border ${
                  errors.date ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600`}
                placeholderText="Select Date"
              />
              {errors.date && (
                <p className="text-red-500 text-sm">Date is required.</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                className={`w-full px-3 py-2 border ${
                  errors.role ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600`}
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-sm">Role is required.</p>
              )}
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-[#1e1e1e] text-white py-2 rounded-lg font-medium hover:bg-[#1e1e1e]/80"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [activeMenu, setActiveMenu] = useState('menu');
  const [products, setProducts] = useState<ProductDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const manufacturerId = '12';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const fetchedProducts =
          await getRegisteredProductsByManufacturer(manufacturerId);
        if (fetchedProducts) {
          setProducts(fetchedProducts);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    if (manufacturerId) {
      fetchProducts();
    }
  }, [manufacturerId]);

  const handlePageClick = (page: React.SetStateAction<number>) => {
    setActivePage(page);
  };

  const handleMenuClick = (menu: React.SetStateAction<string>) => {
    setActiveMenu(menu);
  };

  return (
    <div className="flex flex-col md:flex-row h-auto bg-[#FFFFFF]">
      <aside
        className="hidden md:block w-[100px] bg-[#1e1e1e] text-white"
        style={{ minHeight: '1014px' }}
      >
        <div className="flex items-center justify-center h-20 text-2xl font-bold">
          <IoMdMenu size={28} />
        </div>
        <nav className="mt-6">
          <ul className="space-y-4">
            <li
              onClick={() => handleMenuClick('diamond')}
              className={`flex items-center justify-center rounded-l-xl px-2 py-3 cursor-pointer ${
                activeMenu === 'diamond'
                  ? 'bg-white text-black'
                  : 'hover:bg-white hover:text-black'
              }`}
            >
              <BsFillXDiamondFill size={28} />
            </li>
            <li
              onClick={() => handleMenuClick('settings')}
              className={`flex items-center justify-center rounded-l-xl px-2 py-3 cursor-pointer ${
                activeMenu === 'settings'
                  ? 'bg-white text-black'
                  : 'hover:bg-white hover:text-black'
              }`}
            >
              <IoSettingsOutline size={28} />
            </li>
          </ul>
        </nav>
      </aside>

      <main className="flex-1 overflow-auto bg-gray-200">
        <header className="flex flex-wrap items-center justify-between bg-white p-4">
          <h1 className="text-xl font-bold">Inspection List</h1>
          <div className="flex items-center">
            <Image src={boy} alt="Avatar" className="w-8 h-8 rounded-full" />
            <div className="ml-4">
              <span className="font-semibold">Joy Daniel</span>
              <p className="text-sm text-gray-500">Owner</p>
            </div>
          </div>
        </header>
        <header className="flex flex-wrap items-center justify-between p-4 bg-gray-200 rounded-lg">
          <div className="flex gap-4 mb-2 md:mb-0">
            <button className="bg-[#1e1e1e] text-white px-4 py-2 rounded-lg hover:bg-[#1e1e1e]/80">
              Upcoming
            </button>
            <button className="bg-gray-100 text-black px-4 md:px-8 border border-gray-300 py-2 rounded-lg">
              Post
            </button>
          </div>
          <div className="flex-1 mx-4">
            <div className="relative">
              <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search"
                className="border font-medium font-poppins border-gray-300 bg-gray-100 rounded-2xl pl-10 pr-4 py-2 text-sm w-full md:w-3/4"
              />
            </div>
          </div>
          <div>
            <button
              onClick={() => setModalOpen(true)}
              className="bg-[#1e1e1e] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#1e1e1e]/80"
            >
              Add Product
            </button>
          </div>
        </header>
        <AddProductModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
        />

        <div className="py-10 mt-8 bg-gray-200 mx-4 overflow-x-auto">
          <table className="w-full table-auto text-sm border-separate border-spacing-y-2 md:border-spacing-y-3">
            <thead>
              <tr className="bg-white text-black text-xs md:text-sm">
                <th className="p-2 md:p-4">ID</th>
                <th className="p-2 md:p-4 hidden sm:table-cell">Name</th>
                <th className="p-2 md:p-4">Image</th>
                <th className="p-2 md:p-4 hidden sm:table-cell">
                  Manufacturer
                </th>
                <th className="p-2 md:p-4 hidden sm:table-cell">
                  Manufactured Date
                </th>
                <th className="p-2 md:p-4 hidden sm:table-cell">Expiry Date</th>
              </tr>
            </thead>
            <tbody>
              {products && products.length > 0 ? (
                <>
                  {products.map((product, idx) => (
                    <tr
                      key={idx}
                      className={`text-black shadow-md hover:bg-gray-100 rounded-lg ${
                        idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                      }`}
                    >
                      <td className="p-2 md:p-4 flex items-center text-xs md:text-sm font-poppins leading-5 font-medium break-words">
                        {product.product_id}
                      </td>
                      <td className="p-2 md:p-4 text-xs md:text-sm font-poppins leading-5 font-medium hidden sm:table-cell">
                        {product.name}
                      </td>
                      <td className="p-2 md:p-4 flex items-center text-xs md:text-sm font-poppins leading-5 font-medium">
                        <Image
                          src={product.image}
                          alt="product image"
                          width={30}
                          height={30}
                          className="w-6 h-6 md:w-10 md:h-10 rounded-full mr-2"
                        />
                      </td>
                      <td className="p-2 md:p-4 text-xs md:text-sm font-poppins leading-5 font-medium hidden sm:table-cell">
                        <p>{product.manufacturer}</p>
                      </td>
                      <td className="p-2 md:p-4 text-xs md:text-sm font-poppins leading-5 font-medium hidden sm:table-cell">
                        <p>{product.manufactureDate}</p>
                      </td>
                      <td className="p-2 md:p-4 text-xs md:text-sm font-poppins leading-5 font-medium hidden sm:table-cell">
                        <p>{product.expiryDate}</p>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <div className="text-center">No products found.</div>
              )}
            </tbody>
          </table>
        </div>

        {products.length >= 1 && (
          <div className="flex flex-wrap justify-center items-center gap-2 p-4">
            <button className="px-4 py-2 mx-1 text-gray-600 hover:bg-[#1e1e1e] hover:text-white">
              &laquo;
            </button>
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                onClick={() => handlePageClick(page)}
                className={`px-4 py-2 mx-1 border border-gray-300 rounded-md text-gray-600 ${
                  activePage === page
                    ? 'bg-[#1e1e1e] text-white'
                    : 'hover:bg-[#1e1e1e] hover:text-white'
                }`}
              >
                {page}
              </button>
            ))}
            <button className="px-4 py-2 mx-1 text-gray-600 hover:bg-[#1e1e1e] hover:text-white">
              &raquo;
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
