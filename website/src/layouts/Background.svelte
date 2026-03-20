<script>
  import { backgroundLightLevel } from "@/store/backgroundStore";

  let transformedBackgroundLight = $derived(
    $backgroundLightLevel === 1
      ? `rgb(38 38 38 / ${$backgroundLightLevel})`
      : `rgb(0 0 0 / ${$backgroundLightLevel})`
  );
</script>

<div
  style={`background: ${transformedBackgroundLight}`}
  class="fixed inset-0 z-[-10] transition-colors duration-200 ease-in-out"
/>
