import Image from "next/image";

type TechItem = {
  name: string;
  icon: string;
};

type TechStackProps = {
  items: TechItem[];
};

export default function TechStack({ items }: TechStackProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 my-10">
      {items.map((tech) => (
        <div
          key={tech.name}
          className="flex flex-col items-center justify-center gap-3 transition-transform duration-300 hover:scale-110"
        >
          <Image
            src={tech.icon}
            alt={tech.name}
            width={80}
            height={80}
            className="object-contain"
          />
          <span className="text-sm font-medium text-center">
            {tech.name}
          </span>
        </div>
      ))}
    </div>
  );
}