import FeaturePage from "./FeaturePage";
export default function ContentStrategy() {
  return (
    <FeaturePage
      title="Content strategy"
      description="Build topic clusters and find the content most likely to grow qualified traffic."
      score="74"
      items={[
        ["3 missing supporting articles", "High impact"],
        ["12 internal linking opportunities", "Review"],
        ["4 pages need freshness updates", "Review"],
      ]}
    />
  );
}
