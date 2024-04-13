'use client';
import { cn } from '@/app/utils/shadcn/utils';

import { useState } from 'react';
import { ResultCategoryDetailToggle } from '../../view/shadcn/switch';
import ResultCagegoryDetailLecture from './result-cagegory-detail-lecture';
import { ResultCategoryDetailInfo } from '@/app/business/result/result.query';

interface ResultCategoryDetailContentProps {
  info: ResultCategoryDetailInfo;
}

function ResultCategoryDetailContent({ info }: ResultCategoryDetailContentProps) {
  const { takenCredit, totalCredit, detailCategory } = info;

  const [isTakenLecture, setIsTakenLectrue] = useState(false);

  return (
    <div className="md:w-[80vw] max-w-[1200px] p-2">
      <div className="flex justify-between">
        <div>
          <h1 className={cn('text-2xl font-bold', 'md:text-4xl')}>전공필수</h1>
          <p className={cn('text-sm text-gray-6 font-medium my-6', 'md:text-lg')}>
            <span>전공필수 과목 중</span>
            <ResultCategoryDetailToggle
              checked={isTakenLecture}
              onCheckedChange={setIsTakenLectrue}
              className="absolute zIndex-2"
            />
            <span>과목이 표시됩니다.</span>
          </p>
        </div>
        <div className={cn('text-2xl font-bold', 'md:text-4xl')}>
          <span className="text-point-blue">{takenCredit}</span> / {totalCredit}
        </div>
      </div>
      {detailCategory.map((category, index) => (
        <ResultCagegoryDetailLecture isTakenLecture={isTakenLecture} detailCategory={category} key={index} />
      ))}
    </div>
  );
}

export default ResultCategoryDetailContent;
