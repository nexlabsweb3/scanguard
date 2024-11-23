import {
  BuildingOffice2Icon,
  UserIcon,
  IdentificationIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';

export default function ManufacturerForm() {
  return (
    <div className=" w-[52rem] space-y-8">
      <div className="text-center">
        <h2 className="mt-6 text-3xl font-extrabold text-white">
          Create Manufacturer Account
        </h2>
        <p className="mt-2 text-[16px] text-gray-400">
          Enter your Manufacturer details to get started
        </p>
      </div>
      <form className="mt-8 space-y-6 bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-gray-700">
        <div className="space-y-6">
          <div>
            <label htmlFor="company-name" className="block text-sm font-medium text-gray-200 mb-2">
              Company Name
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BuildingOffice2Icon className="h-5 w-5 text-gray-300" aria-hidden="true" />
              </div>
              <input
                id="company-name"
                name="companyName"
                type="text"
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-xl bg-black/30 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition duration-150 ease-in-out sm:text-sm text-white"
                placeholder="Enter company name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="manufacturer-name" className="block text-sm font-medium text-gray-200 mb-2">
              Manufacturer Name
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-gray-300" aria-hidden="true" />
              </div>
              <input
                id="manufacturer-name"
                name="manufacturerName"
                type="text"
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-xl bg-black/30 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition duration-150 ease-in-out sm:text-sm text-white"
                placeholder="Enter manufacturer name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-200 mb-2">
              Address
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapIcon className="h-5 w-5 text-gray-300" aria-hidden="true" />
              </div>
              <input
                id="address"
                name="address"
                type="text"
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-xl bg-black/30 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition duration-150 ease-in-out sm:text-sm text-white"
                placeholder="Enter company address"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
              Email
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <EnvelopeIcon className="h-5 w-5 text-gray-300" aria-hidden="true" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-xl bg-black/30 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition duration-150 ease-in-out sm:text-sm text-white"
                placeholder="Enter company email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="rc" className="block text-sm font-medium text-gray-200 mb-2">
              Registration Code
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IdentificationIcon className="h-5 w-5 text-gray-300" aria-hidden="true" />
              </div>
              <input
                id="rc"
                name="rc"
                type="text"
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-xl bg-black/30 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition duration-150 ease-in-out sm:text-sm text-white"
                placeholder="Enter registration code"
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-200 mb-2">
              Phone Number
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <PhoneIcon className="h-5 w-5 text-gray-300" aria-hidden="true" />
              </div>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-xl bg-black/30 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition duration-150 ease-in-out sm:text-sm text-white"
                placeholder="Enter phone number"
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="registration-image" className="block text-sm font-medium text-gray-200 mb-2">
            Registration Image (Evidence)
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <PhotoIcon className="h-5 w-5 text-gray-300" aria-hidden="true" />
            </div>
            <input
              id="registration-image"
              name="registrationImage"
              type="file"
              accept="image/*"
              required
              className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-xl bg-black/30 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition duration-150 ease-in-out sm:text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-500 file:text-white hover:file:bg-orange-600"
            />
          </div>
          <p className="mt-2 text-sm text-gray-400">Upload an image file as proof of registration.</p>
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-150 ease-in-out"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <BuildingOffice2Icon className="h-5 w-5 text-white" aria-hidden="true" />
            </span>
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
