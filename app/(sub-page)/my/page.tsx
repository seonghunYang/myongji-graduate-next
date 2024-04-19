import LectureSearch from '@/app/ui/lecture/lecture-search';
import TakenLecture from '@/app/ui/lecture/taken-lecture';
import ContentContainer from '@/app/ui/view/atom/content-container';
import Drawer from '@/app/ui/view/molecule/drawer/drawer';
import { DIALOG_KEY } from '@/app/utils/key/dialog.key';

interface MyPageProps {
  searchParams: {
    keyword?: string;
    type?: string;
  };
}
export default function MyPage({ searchParams }: MyPageProps) {
  return (
    <>
      <ContentContainer className="flex">
        <div className="hidden lg:w-[30%] lg:block">정보칸</div>
        <div className="w-full lg:w-[70%] lg:px-[20px]">
          <TakenLecture />
        </div>
      </ContentContainer>
      <Drawer drawerKey={DIALOG_KEY.LECTURE_SEARCH}>
        <LectureSearch searchParams={searchParams} />
      </Drawer>
    </>
  );
}
