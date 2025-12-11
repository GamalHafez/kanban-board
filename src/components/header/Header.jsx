import {
  HeaderIdentity,
  HeaderBoardTitle,
  HeaderDropdown,
} from "@components/header";

export function Header() {
  return (
    <header className="text-main-blue border-lines-light flex h-[65px] shrink-0 items-center border-b bg-white capitalize md:h-[97px] lg:h-[97px]">
      <HeaderIdentity />
      <div className="border-lines-light flex flex-1 items-center justify-between self-stretch border-b pr-6 pl-0.5 md:pl-6 lg:pl-6">
        <HeaderBoardTitle />
        <HeaderDropdown />
      </div>
    </header>
  );
}
