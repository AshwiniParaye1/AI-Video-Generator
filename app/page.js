import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <h2>AI Video Generator</h2>
      <Button>Button</Button>
      <UserButton />
    </div>
  );
}
