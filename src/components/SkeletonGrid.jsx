import SkeletonCard from "./SkeletonCard"

function SkeletonGrid({count = 12}) {
  return (
    <div className="movie-grid">
        {Array.from({length: count}).map((_, index) => (
            <SkeletonCard key={index} />
        ))}
    </div>
  )
}

export default SkeletonGrid