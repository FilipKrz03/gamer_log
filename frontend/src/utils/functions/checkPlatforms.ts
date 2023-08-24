const checkPlaforms = (platforms: { platform: { name: string } }[]) => {
  let hasPc = false;
  let hasXbox = false;
  let hasPlayStation = false;

  platforms.map((platform) => {
    if (platform.platform.name.includes("Xbox")) {
      hasXbox = true;
    }
    if (platform.platform.name.includes("PC")) {
      hasPc = true;
    }
    if (platform.platform.name.includes("PlayStation")) {
      hasPlayStation = true;
    }
  });
  return { hasPc, hasXbox, hasPlayStation };
};

export default checkPlaforms;
