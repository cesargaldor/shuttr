import Masonry from "@/components/masonry";
import { Badge } from "@/components/ui/badge";

const Latest = () => {
  return (
    <div className="flex flex-col items-center mt-20">
      <Badge
        variant="secondary"
        className="w-fit">
        Latest
      </Badge>
      <h1 className="text-6xl font-bold mt-8 font-zilla">Discover</h1>
      <h2 className="mt-3 text-3xl">The newest photographic gems shared by our community.</h2>

      <div className="mt-16">
        <Masonry />
      </div>
    </div>
  );
};

export default Latest;
