import Image from "next/image";

const MaskedVideo = () => {
    return (
      <div className="w-full bg-gray-300 flex items-center justify-center rounded-2xl">
        <div className="mask-x">
            <Image src="/common/gameFooter.jpg" alt="pic" width={200} height={100} />
        </div>
      </div>
    );
  };

  export default MaskedVideo


//   import Image from "next/image";

// const MaskedVideo = () => {
//     return (
//       <div className="relative w-full h-screen bg-black flex items-center justify-center">
//         <div className="relative mask-x">
//             <Image src="/common/gameFooter.jpg" alt="pic" width={1000} height={100} />
//           {/* <video
//             autoPlay
//             muted
//             loop
//             playsInline
//             className="absolute top-0 left-0 w-full h-full object-cover"
//           >
//             <source src="/videos/bg-main.mp4" type="video/mp4" />
//           </video> */}
//         </div>
//       </div>
//     );
//   };

//   export default MaskedVideo