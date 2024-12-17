import { UserInfoResponse } from '@/app/business/services/user/user.type';
import { CreditResponse } from '@/app/store/querys/result';
import { RESULT_CATEGORY } from '../key/result-category.key';

interface AreaType {
  totalCredit: number;
  detailCategory: DetailCategoryType[];
  graduationCategory: keyof typeof RESULT_CATEGORY;
  takenCredit: number;
  completed: boolean;
  normalLeftCredit: number;
  freeElectiveLeftCredit: number;
}

interface DetailCategoryType {
  totalCredits: number;
  takenCredits: number;
  takenLectrues: LectureType[];
  haveToLectures: LectureType[];
  detailCategoryName: string;
  normalLeftCredit: number;
  freeElectiveLeftCredit: number;
  completed: boolean;
  satisfiedMandatory: boolean;
}

interface CategoryType {
  totalCredit: number;
  takenCredit: number;
  categoryName: string;
  completed: boolean;
  leftCredit?: number;
}

interface LectureType {
  id: string;
  name: string;
  credit: number;
  duplicateCode: string;
  isRevoked: number;
  culture: boolean;
}

export interface AnonymousResultType {
  user: UserInfoResponse;
  graduationResult: {
    chapelResult: {
      takenCount: number;
      complted: boolean;
      takenChapelCredit: number;
    };
    detailGraduationResults: AreaType[];
    normalCultureGraduationResult: CategoryType;
    freeElectiveGraduationResult: CategoryType;
    totalCredit: number;
    takenCredit: number;
    graduated: boolean;
  };
}

export const parseUserInfo = (data: AnonymousResultType): UserInfoResponse => {
  return {
    ...data.user,
    takenCredit: data.graduationResult.takenCredit,
    totalCredit: data.graduationResult.totalCredit,
  };
};

export const parseCredit = ({ graduationResult }: AnonymousResult): CreditResponse[] => {
  const detailCredits = graduationResult.detailGraduationResults.map(
    (item): CreditResponse => ({
      category: item.graduationCategory,
      totalCredit: item.totalCredit,
      takenCredit: item.takenCredit,
      completed: item.completed,
    }),
  );

  const additionalCredits: CreditResponse[] = [
    {
      category: 'CHAPEL',
      totalCredit: 2,
      takenCredit: graduationResult.chapelResult.takenCount * 0.5,
      completed: graduationResult.chapelResult.takenCount * 0.5 >= 2.0,
    },
    {
      category: 'NORMAL_CULTURE',
      totalCredit: graduationResult.normalCultureGraduationResult.totalCredit,
      takenCredit: graduationResult.normalCultureGraduationResult.takenCredit,
      completed: graduationResult.normalCultureGraduationResult.completed,
    },
    {
      category: 'FREE_ELECTIVE',
      totalCredit: graduationResult.freeElectiveGraduationResult.totalCredit,
      takenCredit: graduationResult.freeElectiveGraduationResult.takenCredit,
      completed: graduationResult.freeElectiveGraduationResult.completed,
    },
  ];

  return [...detailCredits, ...additionalCredits];
};