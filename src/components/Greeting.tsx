import { useAuth } from "../contexts/AuthContext";

interface GreetingProps {
  setModalOpen: (open: boolean) => void;
}

export const Greeting = ({ setModalOpen }: GreetingProps) => {
  const auth = useAuth();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour > 5 && hour < 12) return "Good morning";
    if (hour >= 12 && hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div id="greeting" className="w-full text-center p-5">
      <div className="font-bold text-md md:text-2xl p-5">
        {getGreeting()}, you are logged in as {auth.user?.email}.
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
