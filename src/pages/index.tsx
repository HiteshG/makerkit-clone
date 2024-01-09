import { Navbar } from '@/core/navbar';
import First from '@/components/main/First';
import Second from '@/components/main/Second';
import Third from '@/components/main/Third';
import Fourth from '@/components/main/Fourth';
import Footer from '@/core/footer';

export default function Home() {
  return (
    <div>
      <Navbar />
      <First />
      <Second />
      <Third />
      <Fourth />
      <Footer />
    </div>
  );
}
