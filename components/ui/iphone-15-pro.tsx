import Image from "next/image";

export interface Iphone15ProProps {
  width?: number;
  height?: number;
  src?: string;
  className?: string;
}

/*
  Screen area from SVG viewBox (433×882):
  x: 21.25  y: 19.25  w: 389.5  h: 843.5  rx: 55.75
  → percentages: left 4.91%, top 2.18%, width 89.95%, height 95.63%, border-radius 14.31%
*/

export function Iphone15Pro({
  width = 433,
  height = 882,
  src,
  className,
}: Iphone15ProProps) {
  return (
    <div className={`relative ${className ?? ""}`} style={{ aspectRatio: `${width} / ${height}` }}>
      {/* Phone frame SVG */}
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <path
          d="M2 73C2 32.6832 34.6832 0 75 0H357C397.317 0 430 32.6832 430 73V809C430 849.317 397.317 882 357 882H75C34.6832 882 2 849.317 2 809V73Z"
          className="fill-[#E5E5E5] dark:fill-[#404040]"
        />
        <path
          d="M0 171C0 170.448 0.447715 170 1 170H3V204H1C0.447715 204 0 203.552 0 203V171Z"
          className="fill-[#E5E5E5] dark:fill-[#404040]"
        />
        <path
          d="M1 234C1 233.448 1.44772 233 2 233H3.5V300H2C1.44772 300 1 299.552 1 299V234Z"
          className="fill-[#E5E5E5] dark:fill-[#404040]"
        />
        <path
          d="M1 319C1 318.448 1.44772 318 2 318H3.5V385H2C1.44772 385 1 384.552 1 384V319Z"
          className="fill-[#E5E5E5] dark:fill-[#404040]"
        />
        <path
          d="M430 279H432C432.552 279 433 279.448 433 280V384C433 384.552 432.552 385 432 385H430V279Z"
          className="fill-[#E5E5E5] dark:fill-[#404040]"
        />
        <path
          d="M6 74C6 35.3401 37.3401 4 76 4H356C394.66 4 426 35.3401 426 74V808C426 846.66 394.66 878 356 878H76C37.3401 878 6 846.66 6 808V74Z"
          className="dark:fill-[#262626] fill-white"
        />
        <path
          opacity="0.5"
          d="M174 5H258V5.5C258 6.60457 257.105 7.5 256 7.5H176C174.895 7.5 174 6.60457 174 5.5V5Z"
          className="fill-[#E5E5E5] dark:fill-[#404040]"
        />
      </svg>

      {/* Screenshot on top of SVG, positioned to match the screen area */}
      {src && (
        <div
          className="absolute overflow-hidden z-10"
          style={{
            left: "4.91%",
            top: "2.18%",
            width: "89.95%",
            height: "95.63%",
            borderRadius: "14.31%",
          }}
        >
          <Image
            src={src}
            alt=""
            fill
            sizes="(max-width: 768px) 25vw, 15vw"
            className="object-cover object-top"
          />
        </div>
      )}
    </div>
  );
}
