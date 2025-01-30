import { NewsForm } from "@/components/NewsForm";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-white to-gray-50">
      <div className="w-full max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Social Media Content Pipeline</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Streamline your content distribution across multiple platforms with a single click
          </p>
        </div>
        <NewsForm />
      </div>
    </div>
  );
};

export default Index;