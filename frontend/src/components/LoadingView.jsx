import { ClipLoader } from 'react-spinners';

export function LoadingView() {
  return (
    <div className="bg-[#0e1a40] min-h-screen flex flex-col items-center justify-center text-[#936b2d]">
      <h1>Analysing your personality...</h1>
      <ClipLoader
        color="#936b2d"
        loading={true}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
