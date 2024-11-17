import { useMediaQuery } from "./use-media-query";

const useScreenSize = () => {
     const isMobile = useMediaQuery("(min-width: 640px)");
     const isMedium = useMediaQuery("(min-width: 768px)");
     const isDesktop = useMediaQuery("(min-width: 1024px)");
     
  return {isDesktop, isMedium, isMobile}
}

export default useScreenSize