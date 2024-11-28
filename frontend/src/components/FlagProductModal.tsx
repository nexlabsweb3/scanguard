import { FlagIcon } from '@/assets/icons';
import { handleFlagProduct } from '@/services/apiService';
import React, { useState } from 'react';

export default function FlagProductModal({
  setOpen,
  product_id,
}: {
  setOpen: () => void;
  product_id: string;
}) {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [customOption, setCustomOption] = useState<string>('');

  const flagOptions = [
    {
      option: 'Product quality does not match the description.',
    },
    {
      option: 'Brand logo or details seem incorrect.',
    },
    {
      option: 'Suspected counterfeit.',
    },
    {
      option: "I've seen similar counterfeit products elsewhere.",
    },
    {
      option: 'Packaging looks different from the original.',
    },
  ];

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
    setCustomOption('');
  };

  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomOption(e.target.value);
    setSelectedOption('');
  };

  return (
    <div className="absolute inset-0 justify-center flex pt-10 lg:pt-[180px] bg-black bg-opacity-80 backdrop-blur-sm z-40 px-4">
      <div className="bg-[#1E1E1E] border-[1px] border-[#303030] rounded-[16px] md:w-[490px] py-6 px-4 h-fit">
        <h2 className="flex justify-center text-[#F9F9F9] items-center text-center gap-x-[5px] text-sm lg:text-base lg:leading-6 mb-4 lg:mb-[26px]">
          <FlagIcon />
          Flag product
        </h2>

        <div className="flex flex-col gap-y-2 text-[#F9F9F9] mb-4 lg:mb-[26px]">
          {flagOptions.map((opt, i) => (
            <label
              key={i}
              className="p-3 lg:p-4 border-[1px] border-[#303030] rounded-lg lg:rounded-2xl text-xs lg:text-sm lg:leading-6 flex items-center gap-x-3 cursor-pointer"
            >
              <input
                type="radio"
                name="flagOption"
                value={opt.option}
                checked={selectedOption === opt.option}
                onChange={handleOptionChange}
                className="text-[#F9F9F9] focus:ring-[#303030]"
              />
              {opt.option}
            </label>
          ))}
          <input
            type="text"
            placeholder="Other (Please specify)"
            value={customOption}
            onChange={handleCustomInputChange}
            className="text-xs lg:text-sm lg:leading-6 placeholder:text-[#868686] p-4 border-[1px] border-[#303030] bg-transparent rounded-lg lg:rounded-xl"
          />
        </div>

        <div className="grid grid-cols-2 gap-x-4 lg:text-base text-sm lg:leading-6 text-[#F9F9F9]">
          <button
            className="py-3 lg:py-[15px] bg-transparent border-[#303030] border-[1px] rounded-lg lg:rounded-2xl"
            onClick={setOpen}
          >
            Go back
          </button>
          <button
            className="py-3 lg:py-[15px] bg-[#343131] rounded-lg lg:rounded-2xl"
            onSubmit={() =>
              handleFlagProduct(product_id, selectedOption || customOption)
            }
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
