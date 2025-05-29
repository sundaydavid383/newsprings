class HumanWeakness {
  constructor(name) {
    this.name = name;
    this.infirmities = ["thornInFlesh", "temptation", "fear", "weariness"];
    this.selfStrength = 0; // no strength of his own
  }

  async pleadWithGod(times = 3) {
    for (let i = 1; i <= times; i++) {
      console.log(`[${this.name}] Pleading with God... Attempt ${i}`);
      await this.wait(1000); // symbolic pause
    }

    return this.receiveGrace();
  }

  receiveGrace() {
    const divineResponse = {
      grace: "sufficient",
      power: (weakness) => {
        return weakness === true ? "perfectedStrengthOfChrist" : "humanEffort";
      }
    };

    const spiritualLog = `
      God: "My grace is sufficient for thee,
      for My strength is made perfect in weakness."
      
      Response: Therefore, ${this.name} will glory in his infirmities,
      that the power of Christ may rest upon him.
    `;

    console.log(spiritualLog);

    return divineResponse.power(true); // weakness is true
  }

  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// === Usage ===
(async () => {
  const paul = new HumanWeakness("Paul");
  const result = await paul.pleadWithGod();

  if (result === "perfectedStrengthOfChrist") {
    console.log("🔥 Christ's power has taken over where human strength failed.");
  }
})();