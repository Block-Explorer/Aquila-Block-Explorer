
const params = {
    LAST_POW_BLOCK: 200, //182700, // 345600
    RAMP_TO_BLOCK: 960,
    TREASSURY_BLOCK_START:300000,
    TREASSURY_BLOCK_STEP:1440,
  };

const avgBlockTime = 60; // 1.0 minutes (60 seconds)

const blocksPerDay = (24 * 60 * 60) / avgBlockTime; // 1440

const blocksPerWeek = blocksPerDay * 7; // 10080

const blocksPerMonth = (blocksPerDay * 365.25) / 12; // 43830

const blocksPerYear = blocksPerDay * 365.25; // 525960

const mncoins = 5000.0;

const getMNBlocksPerDay = (mns) => {
  return blocksPerDay / mns;
};

const getMNBlocksPerWeek = (mns) => {
  return getMNBlocksPerDay(mns) * (365.25 / 52);
};

const getMNBlocksPerMonth = (mns) => {
  return getMNBlocksPerDay(mns) * (365.25 / 12);
};

const getMNBlocksPerYear = (mns) => {
  return getMNBlocksPerDay(mns) * 365.25;
};

const getMNSubsidy = (nHeight = 0, nMasternodeCount = 0, nMoneySupply = 0) => {
    const blockValue = getSubsidy(nHeight);
    return blockValue * 0.7;
};

const getSubsidy = (nHeight = 1) => {
  let nSubsidy = 0.0;

    //Check if Block is Treassury
    if ((nHeight - params.TREASSURY_BLOCK_START) % params.REVIVE_BLOCK_STEP == 0) {
        if (nHeight == nStartTreasuryBlock)
            nSubsidy = 50000; //50k coins to catch up from missed blocks
        else
            nSubsidy = 1450; //1450 each day from this point on
    } 
    // Not a Revive Block Or Dev Block
    else {
        if (nHeight > 0 && nHeight <= 20) //Genesis Block is 0 then 7,500 coins per block till 20
            nSubsidy = 75000;
        else if (nHeight > 20 && nHeight <= 200) //PoW stage 0 coins per block till 200
            nSubsidy = 0;
        else if (nHeight > 200 && nHeight <= 5000) //PoS stage begins
            nSubsidy = 20;
        else if (nHeight > 5000 && nHeight <= 10000)
            nSubsidy = 30;
        else if (nHeight > 10000 && nHeight <= 50000)
            nSubsidy = 60;
        else if (nHeight > 50000 && nHeight <= 100000)
            nSubsidy = 30;
        else if (nHeight > 100000)
            nSubsidy = 20;
    }

  return nSubsidy;
};

const getROI = (subsidy, mns) => {
  return ((getMNBlocksPerYear(mns) * subsidy) / mncoins) * 100.0;
};

const isAddress = (s) => {
  return typeof(s) === 'string' && s.length === 34;
};

const isBlock = (s) => {
  return !isNaN(s) || (typeof(s) === 'string');
};

const isPoS = (b) => {
  return !!b && b.height > params.LAST_POW_BLOCK; // > 182700
};

const isTX = (s) => {
  return typeof(s) === 'string' && s.length === 64;
};

module.exports = {
  avgBlockTime,
  blocksPerDay,
  blocksPerMonth,
  blocksPerWeek,
  blocksPerYear,
  mncoins,
  params,
  getMNBlocksPerDay,
  getMNBlocksPerMonth,
  getMNBlocksPerWeek,
  getMNBlocksPerYear,
  getMNSubsidy,
  getSubsidy,
  getROI,
  isAddress,
  isBlock,
  isPoS,
  isTX
};
