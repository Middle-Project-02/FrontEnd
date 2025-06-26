/**
 * 속도 문자열을 kbps 단위의 숫자로 변환합니다.
 * @param speedLimit - "5Mbps", "1Mbps", "400kbps" 등의 문자열
 * @returns kbps 단위의 숫자값
 */
const convertToKbps = (speedLimit: string): number => {
  const numericValue = parseFloat(speedLimit);

  if (speedLimit.toLowerCase().includes('mbps')) {
    return numericValue * 1000; // Mbps를 kbps로 변환
  } else if (speedLimit.toLowerCase().includes('kbps')) {
    return numericValue;
  }

  return 0; // 파싱 실패시 0 반환
};

/**
 * 속도 제한에 따른 사용성 설명을 반환합니다.
 * @param speedLimit - "5Mbps", "1Mbps", "400kbps" 등의 문자열
 * @returns 사용성에 대한 설명 문자열
 */
export const getSpeedLimitDescription = (speedLimit: string | null): string => {
  if (!speedLimit) {
    return '속도가 제한돼요.';
  }

  const speedInKbps = convertToKbps(speedLimit);

  if (speedInKbps >= 5000) {
    // 5Mbps 이상
    return `빠른 속도인 ${speedLimit}로 제한돼요. 고화질 유튜브 영상 시청이 가능해요.`;
  } else if (speedInKbps >= 1000) {
    // 1Mbps 이상
    return `조금 느린 속도인 ${speedLimit}로 제한돼요. 간단한 검색이나 메신저 사용이 가능해요.`;
  } else if (speedInKbps >= 400) {
    // 400kbps 이상
    return `많이 느린 속도인 ${speedLimit}로 제한돼요.`;
  } else {
    return `매우 느린 속도인 ${speedLimit}로 제한돼요.`;
  }
};
