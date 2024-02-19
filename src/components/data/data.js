import { IoPhonePortraitOutline } from 'react-icons/io5';
import { HiOutlineDesktopComputer } from 'react-icons/hi';
import { BsSmartwatch } from 'react-icons/bs';
import { MdOutlineCameraAlt } from 'react-icons/md';
import { IoMdHeadset } from 'react-icons/io';
import { IoLogoGameControllerB } from 'react-icons/io';

export const categoryItem = [
  {
    id: 1,
    imageName: <IoPhonePortraitOutline size={63} />,
    name: 'Phone',
  },
  {
    id: 2,
    imageName: <HiOutlineDesktopComputer size={63} />,
    name: 'computer',
  },
  {
    id: 3,
    imageName: <BsSmartwatch size={63} />,
    name: 'smartwatch',
  },
  {
    id: 4,
    imageName: <MdOutlineCameraAlt size={63} />,
    name: 'Camera',
  },
  {
    id: 5,
    imageName: <IoMdHeadset  size={63} />,
    name: 'Headphones',
  },
  {
    id: 6,
    imageName: <IoLogoGameControllerB size={63} />,
    name: 'Gaming',
  },
];