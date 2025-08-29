import { CometCard } from "@/components/ui/comet-card";
import { figures } from "@/data";
import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex gap-8 justify-center">
      {figures.map((f) => (
        <CometCard>
          <button
            type="button"
            className="my-10 flex w-80 cursor-pointer flex-col items-stretch rounded-[16px] border-0 bg-[#1F2121] p-2 saturate-0 md:my-20 md:p-4"
            aria-label="View invite F7RA"
            style={{
              transformStyle: "preserve-3d",
              transform: "none",
              opacity: 1,
            }}
            onClick={() => navigate(`/figure/${f.id}`)}
          >
            <div className="mx-2 flex-1">
              <div className="relative mt-2 aspect-square w-full">
                <img
                  loading="lazy"
                  className="absolute inset-0 h-full w-full rounded-[16px] bg-[#000000] object-cover contrast-75"
                  src={f.photoUrl}
                  alt={f.name}
                  style={{
                    boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 6px 0px",
                    opacity: 1,
                  }}
                />
              </div>
            </div>
            <div className="mt-2 flex flex-shrink-0 items-center justify-between px-2 py-4 font-mono text-white">
              <div className="text-xl">Affan Kurniawan</div>
            </div>
          </button>
        </CometCard>
      ))}
    </div>
  );
}
