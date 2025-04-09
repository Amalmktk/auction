import { FC, useState } from 'react';
import { DropDownValueProps } from '../types';
import Button from './Button';

interface DropDownProps {
  label: string;
  values: DropDownValueProps[];
  onSelect: (arg: any) => void;
  className?: string;
}

const DropDown: FC<DropDownProps> = ({
  label,
  values,
  onSelect,
  className,
}) => {
  const [showList, setShowList] = useState(false);
  const [showValue, setShowValue] = useState(label);
  return (
    <div className={`z-[60] w-48 relative ${className}`}>
      <Button
        onClick={() => setShowList(true)}
        label={showValue}
        isActive={false}
        className="w-full relative m-0"
        iconName="svg/downArrow.svg"
      />
      {showList && (
        <div className="absolute flex flex-col top-12 border border-black border-t-0 bg-white w-48 shadow-lg">
          {values.map((item) => (
            <Button
              onClick={() => {
                onSelect(item.id);
                setShowValue(item.value);
                setShowList(false);
              }}
              label={item.value}
              isActive={false}
              key={`${item.id}_${item.value}`}
              className="m-0 border-b-0 border-x-0 h-12"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
