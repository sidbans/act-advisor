interface GreetingProps {
  setModalOpen: (open: boolean) => void;
}

export const Greeting = ({ setModalOpen }: GreetingProps) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour > 5 && hour < 12) return "Good morning";
    if (hour >= 12 && hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div id="greeting" className="w-full text-center p-3 sm:p-4 md:p-5">
      <div className="font-bold text-sm sm:text-base md:text-xl lg:text-2xl p-3 sm:p-4 md:p-5 break-words">
        {getGreeting()}! How are you feeling?
      </div>
      <button
        className="btn btn-sm md:btn-md btn-primary"
        onClick={() => setModalOpen(true)}
      >
        Add new rating
      </button>
    </div>
  );
};
