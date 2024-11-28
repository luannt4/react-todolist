import { IoIosArrowUp } from 'react-icons/io';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';

const BackToTopButton: React.FC = () => {
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const handleScrollListener = debounce((e) => {
      e.preventDefault();
      const currentScrollY = window.scrollY;
      //const windowHeight = window.innerHeight;
      //const totalScrollHeight = document.body.scrollHeight;

        if (
            currentScrollY <= 100
            //|| currentScrollY >= totalScrollHeight - windowHeight - 20
        ) {
            setIsShow(false);
            return;
        }

      setIsShow(true);
    }, 100);

    window.addEventListener('scroll', handleScrollListener);

    return () => {
      window.removeEventListener('scroll', handleScrollListener);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div onClick={handleClick} className={`fixed bottom-20 right-10 z-[100] flex content-center items-center cursor-pointer rounded-full 
    w-12  h-12 bg-blue-500 shadow-quickview transition ease-in-out duration-200 ${!isShow && 'opacity-0 translate-y-7'}`}>
      <IoIosArrowUp className="text-xl lg:text-2xl m-auto text-white"  />
    </div>
  )
}

export default BackToTopButton;