import { useRouter } from "next/router";
import { browser } from "process";
import { useState } from "react";

declare const window: typeof globalThis & {
  IMP: any;
};

export default function Loading() {
  const amount = [500, 1000, 2000, 5000];
  const router = useRouter();
  const [selectedAmount, setSelectedAmount] = useState(0);
  const onClickPayment = () => {
    if (process.browser) {
      const IMP = window.IMP;
      IMP.init("imp66884241");
      IMP.request_pay(
        {
          pg: "kakaopay",
          pay_method: "card",
          merchant_uid: `payment-${crypto.randomUUID()}`, // 주문 고유 번호
          name: "나이키 조던1",
          amount: selectedAmount,
          buyer_email: "gildong@gmail.com",
          buyer_name: "홍길동",
          buyer_tel: "010-4242-4242",
          buyer_addr: "서울특별시 강남구 신사동",
          buyer_postcode: "01181",
          m_redirect_url: "http://localhost:3000/29/payment/complete", // 모바일에서는 결제시, 페이지 주소가 바뀜. 따라서 결제 끝나고 돌아갈 주소 입력해야함.
        },
        function (response: any) {
          // 결제 종료 시 호출되는 콜백 함수
          // response.imp_uid 값으로 결제 단건조회 API를 호출하여 결제 결과를 확인하고,
          // 결제 결과를 처리하는 로직을 작성합니다.
          if (response.success === true) {
            console.log(response);
            router.push("/29/payment/complete");
            // 백엔드에 결제관련 데이터 넘겨주기 => 즉 뮤테이션 실행하기
            // createPointTransactionOfLoading
          }
          if (response.error_code != null) {
            return alert(
              `결제에 실패하였습니다. 에러 내용: ${response.error_msg}`,
            );
          }
        },
      );
    }
  };
  return (
    <div>
      <h1>포인트 상자</h1>
      {amount.map((amount, index) => (
        <button key={index} onClick={() => setSelectedAmount(amount)}>
          {amount}원
        </button>
      ))}
      <script src="https://cdn.iamport.kr/v1/iamport.js"></script>
      <br />
      <button onClick={onClickPayment}>{selectedAmount}원 충전하기</button>
    </div>
  );
}
