interface BullBearCasesProps {
  bull: string;
  bear: string;
}

const BullBearCases = ({ bull, bear }: BullBearCasesProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-y-10 md:gap-y-0 md:divide-x md:divide-rule">
      <div className="md:pr-10">
        <p className="label-eyebrow text-success mb-3">Bull Case</p>
        <hr className="border-0 border-t border-rule mb-4" />
        <p className="font-serif text-[16px] leading-[1.65] text-ink">{bull}</p>
      </div>
      <div className="md:pl-10">
        <p className="label-eyebrow text-warn mb-3">Bear Case</p>
        <hr className="border-0 border-t border-rule mb-4" />
        <p className="font-serif text-[16px] leading-[1.65] text-ink">{bear}</p>
      </div>
    </div>
  );
};

export default BullBearCases;
