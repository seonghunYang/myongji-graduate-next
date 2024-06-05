'use client';
import { cn } from '@/app/utils/shadcn/utils';
import ResultCategoryCard from '../result-category-card/result-category-card';
import { fetchCredits } from '@/app/business/services/result/result.query';
import { RESULT_CATEGORY } from '@/app/utils/key/result-category.key';
import { useSuspenseQuery } from '@tanstack/react-query';
import { CreditResponse } from '@/app/business/services/result/result.type';
import { QUERY_KEY } from '@/app/utils/query/react-query-key';

function ResultCategory() {
  const { data: categorys } = useSuspenseQuery<CreditResponse[]>({
    queryKey: [QUERY_KEY.CREDIT],
    staleTime: Infinity,
    queryFn: fetchCredits,
  });

  return (
    <div
      className={cn('absolute grid grid-cols-2 gap-2 top-[30rem] w-full', 'md:max-w-[700px] md:gap-10 md:top-[33rem]')}
    >
      {categorys.map((category, index) => (
        <ResultCategoryCard
          key={index}
          category={RESULT_CATEGORY[category.category]}
          totalCredit={category.totalCredit}
          takenCredit={category.takenCredit}
        />
      ))}
    </div>
  );
}
export default ResultCategory;
