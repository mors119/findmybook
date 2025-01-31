import React, { Dispatch, SetStateAction } from 'react';
import { useDaumPostcodePopup, Address } from 'react-daum-postcode';

// npm install react-daum-postcode

const scriptUrl =
  '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

interface PostcodeProps {
  setAddress: Dispatch<SetStateAction<string>>;
}

export const Postcode = ({ setAddress }: PostcodeProps) => {
  const open = useDaumPostcodePopup(scriptUrl);

  const handleComplete = (data: Address) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    setAddress(fullAddress); // 주소 상태 업데이트
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="w-1/3 bg-black text-white rounded-md ml-2 hover:bg-[#fb5234] transition-all duration-300">
      주소 검색
    </button>
  );
};
