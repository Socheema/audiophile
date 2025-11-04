import React from "react";
import { Container } from "../layout/Container";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { products } from "../../data/products";

interface HomePageProps {
  onNavigate: (page: string, slug?: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const featuredProduct = products.find(
    (p) => p.slug === "xx99-mark-ii-headphones"
  );
  const speakerZx9 = products.find((p) => p.slug === "zx9-speaker");
  const speakerZx7 = products.find((p) => p.slug === "zx7-speaker");
  const earphoneYx1 = products.find((p) => p.slug === "yx1-earphones");

  return (
    <div className="pb-24">
      {/* Hero Section */}
      <div
        className="bg-[#191919] -mt-8 bg-cover bg-center bg-no-repeat relative min-h-[500px] md:min-h-[600px]"
        style={{
          backgroundImage: featuredProduct?.images.desktop
            ? `url('${featuredProduct.images.desktop}')`
            : `url('/assets/home/desktop/image-hero.jpg')`,
        }}
      >
        <Container>
          <div className="relative z-10 py-20 md:py-32 text-center md:text-left justify-between">
            <div className="max-w-[400px] mx-auto md:mx-0 space-y-6">
              <p className="text-white/50 tracking-[0.6em] uppercase">
                New Product
              </p>
              <h1 className="text-white uppercase">
                XX99 Mark II
                <br />
                Headphones
              </h1>
              <p className="text-white/75">
                Experience natural, lifelike audio and exceptional build quality
                made for the passionate music enthusiast.
              </p>
              <Button
                onClick={() => onNavigate("product", featuredProduct?.slug)}
                className="bg-primary hover:bg-accent text-white"
              >
                See Product
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {/* Categories Section */}
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {/* Headphones */}
          {/* <div className="flex flex-col bg-secondary rounded-lg p-6 text-center cursor-pointer hover:shadow-lg transition-shadow w-[350px] h-[204px] relative border border-red-500">
            <div className=" absolute top-50 left-1/2   ">
             className="bg-secondary rounded-lg p-6 text-center group cursor-pointer hover:shadow-lg transition-shadow"

            </div>
            <h3 className="uppercase mb-4">Headphones</h3>
            <button
              onClick={() => onNavigate("headphones")}
              className="text-foreground/50 hover:text-primary inline-flex items-center gap-2 uppercase tracking-wider"
            >
              Shop <ChevronRight className="w-4 h-4" />
            </button>
          </div> */}

          <div className=" flex flex-col border-2 border-red-500 bg-secondary rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow relative">
            <img
              src="/assets/shared/desktop/image-category-thumbnail-headphones.png"
              alt="Speakers"
              className="w-42  object-contain absolute top-[50]"
            />
              <h3 className="uppercase mb-4">Speakers</h3>
            <button
              onClick={() => onNavigate("speakers")}
              className="text-foreground/50 hover:text-primary inline-flex items-center gap-2 uppercase tracking-wider"
            >
              Shop <ChevronRight className="w-4 h-4" />
            </button>

          </div>

          {/* Speakers */}
          <div className="bg-secondary rounded-lg p-6 text-center group cursor-pointer hover:shadow-lg transition-shadow">
            <div className="h-40 flex items-center justify-center mb-4">
              <ImageWithFallback
                src="/assets/shared/desktop/image-category-thumbnail-speakers.png"
                alt="Speakers"
                className="w-32 h-32 object-contain"
              />
            </div>
            <h3 className="uppercase mb-4">Speakers</h3>
            <button
              onClick={() => onNavigate("speakers")}
              className="text-foreground/50 hover:text-primary inline-flex items-center gap-2 uppercase tracking-wider"
            >
              Shop <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Earphones */}
          <div className="bg-secondary rounded-lg p-6 text-center group cursor-pointer hover:shadow-lg transition-shadow">
            <div className="h-40 flex items-center justify-center mb-4">
              <ImageWithFallback
                src="/assets/shared/desktop/image-category-thumbnail-earphones.png"
                alt="Earphones"
                className="w-32 h-32 object-contain"
              />
            </div>
            <h3 className="uppercase mb-4">Earphones</h3>
            <button
              onClick={() => onNavigate("earphones")}
              className="text-foreground/50 hover:text-primary inline-flex items-center gap-2 uppercase tracking-wider"
            >
              Shop <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Container>

      {/* Featured Products */}
      <Container>
        <div className="mt-24 space-y-12">
          {/* ZX9 Speaker Feature */}
          <div className="bg-primary rounded-lg overflow-hidden p-12 md:p-20 text-center md:text-left relative h-[560px]">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="relative">
                <div className="absolute left-8 top-0 w-[410.234px] h-[493px]">
                  <ImageWithFallback
                    src="/assets/home/desktop/image-removebg-preview.png"
                    alt="ZX9 Speaker"
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </div>
              <div className="space-y-6 flex flex-col items-start">
                <h2 className="text-white uppercase">
                  ZX9
                  <br />
                  Speaker
                </h2>
                <p className="text-white/75">
                  Upgrade to premium speakers that are phenomenally built to
                  deliver truly remarkable sound.
                </p>
                <Button
                  onClick={() => onNavigate("product", speakerZx9?.slug)}
                  className="bg-[#101010] hover:bg-[#4C4C4C] text-white w-fit h-[48px]"
                >
                  See Product
                </Button>
              </div>

            </div>
          </div>

          {/* ZX7 Speaker Feature */}
          <div className="relative bg-secondary rounded-lg overflow-hidden p-12 md:p-20">
            <div className="grid md:grid-cols-2 gap-12 items-center justify-between">
              <div className="space-y-6">
                <h3 className="uppercase">ZX7 Speaker</h3>
                <Button
                  onClick={() => onNavigate("product", speakerZx7?.slug)}
                  variant="outline"
                  className="border-2 border-[#101010] hover:bg-[#101010] hover:text-white"
                >
                  See Product
                </Button>
              </div>
              <div className="flex justify-center">
                <ImageWithFallback
                  src="/assets/home/desktop/image-speaker-zx7.jpg"
                  alt="ZX7 Speaker"
                  className=" h-auto  object-cover"
                />
              </div>
            </div>
          </div>

          {/* YX1 Earphones Feature */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-secondary rounded-lg overflow-hidden h-64">
              <ImageWithFallback
                src="/assets/home/desktop/image-earphones-yx1.jpg"
                alt="YX1 Earphones"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-secondary rounded-lg p-12 flex flex-col justify-center space-y-6">
              <h3 className="uppercase">YX1 Earphones</h3>
              <Button
                onClick={() => onNavigate("product", earphoneYx1?.slug)}
                variant="outline"
                className="border-2 border-[#101010] hover:bg-[#101010] hover:text-white w-fit"
              >
                See Product
              </Button>
            </div>
          </div>
        </div>
      </Container>

      {/* About Section */}
      <Container>
        <div className="mt-24 grid md:grid-cols-2 gap-12 items-center ">
          <div className="order-2 md:order-1 space-y-8 w-[445px]">
            <p className="text-black text-[80px] not-italic font-bold leading-[44px] tracking-[1.429px] uppercase ">
              Bringing you the <br /> <span className="text-primary">best</span>{" "}
              audio gear
            </p>
            <p className="text-black text-[15px] not-italic font-normal leading-[25px] opacity-50">
              Located at the heart of New York City, Audiophile is the premier
              store for high end headphones, earphones, speakers, and audio
              accessories. We have a large showroom and luxury demonstration
              rooms available for you to browse and experience a wide range of
              our products. Stop by our store to meet some of the fantastic
              people who make Audiophile the best place to buy your portable
              audio equipment.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <img
              src="/assets/shared/desktop/image-best-gear.jpg"
              alt="Best audio gear"
              className="oject-cover w-[540px] h-[588px] shrink-0 rounded-lg bg-[#f1f1f1]"
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
