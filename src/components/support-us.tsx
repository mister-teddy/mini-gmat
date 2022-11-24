import { FC, useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import sdk from "../utils/sdk";
import Button from "./button";

export const SupportUs: FC = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button onClick={() => setVisible(true)}>☕️</Button>
      <BottomSheet expandOnContentDrag open={visible} onDismiss={() => setVisible(false)} className="text-center">
        <h1 className="font-bold">Support us 💌</h1>
        <p className="p-4 pt-0 opacity-50 text-sm">
          We send you best wishes for your next examination, send us back a coffee!
        </p>
        {[{
          url: 'https://zalo.me/s/934471845456680309/product-detail/?id=9356&type=product',
          image: 'https://img.gotit.vn/compress/580x580/2022/09/1662957061_VeANM.png',
          name: 'Highlands'
        }, {
          url: 'https://zalo.me/s/934471845456680309/product-detail/?id=144&type=product',
          image: 'https://img.gotit.vn/compress/580x580/2020/11/1604658469_jfoRN.png',
          name: 'Phuc Long'
        }, {
          url: 'https://zalo.me/s/934471845456680309/product-detail/?id=2253&type=product',
          image: 'https://trungnguyenecoffee.com/wp-content/uploads/2021/07/Hình-App_3006021-Cà-Phê-Sữa.jpg',
          name: 'Trung Nguyen Legend'
        }].map(coffee => <p key={coffee.url} className="px-4 py-2">
          <Button className="w-full !py-0 space-x-2 text-left active:bg-transparent" onClick={() => sdk.openWebview({
            url: coffee.url
          })}>
            <img src={coffee.image} className="w-24" />
            <b className="flex-1">{coffee.name}</b>
          </Button>
        </p>)}
      </BottomSheet>
    </>
  );
}
