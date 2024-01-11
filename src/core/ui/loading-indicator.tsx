import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';

const LoadingIndicator = () => {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer: any;

    function start() {
      setProgress(0);
      timer = setTimeout(increment, 100);
    }

    function increment() {
      setProgress(progress => {
        const percent = Math.round(Math.random() * 10);
        const next = Math.min(progress + percent, 80);

        if (next < 80) {
          return next;
        }
        
        return 80;
      });
    }


    function complete () {
      clearTimeout(timer);
      setProgress(100);
    }

    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", complete);
    router.events.on("routeChangeError", complete);

    return () => {
      clearTimeout(timer);
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", complete);
      router.events.off("routeChangeError", complete);
    }
  }, [router.events]);

  return (
    <div style={{position: "fixed", top: "0px", left: "0px", height: "4px", background: "transparent", zIndex: 2147483647, width: "100%"}}>
      <div className="bg-primary" style={{height: "100%", width: `${progress}%`, opacity: progress > 0 && progress < 100 ? 1 : 0}}>
        <div style={{boxShadow: "0px 0px 10px, 0px 0px 10px", width: "5%", opacity: progress > 0 && progress < 100 ? 1 : 0, position: "absolute", height: "100%", transform: "rotate(3deg) translate(0px, -4px)", left: `${-5 + progress}%`}}></div>
      </div>
    </div>
  );
}

export default LoadingIndicator;
