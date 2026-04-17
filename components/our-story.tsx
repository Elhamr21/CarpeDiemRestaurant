import Image from "next/image";

export function OurStory() {
  return (
    <section className="py-20 bg-cream">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Text Content */}
          <div className="space-y-6">
            <div>
              <p className="font-sans text-sm uppercase tracking-[0.3em] text-terracotta mb-4">
                Our Story
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-wine mb-8 leading-tight">
                Carpe Diem
              </h2>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Carpe Diem was founded in 2001 with a simple vision: to bring
                authentic Italian cuisine to Berlin. What began as a small
                pizzeria is now a popular meeting place for connoisseurs from
                all over Berlin and beyond.
              </p>

              <p>
                An important part of this story is Cesar, who has shaped the
                heart and soul of our restaurant for many years. With his
                passion for Italian cuisine and his commitment, he has helped
                Carpe Diem become what it is today.
              </p>

              <p>
                Our recipes come from different regions of Italy and are passed
                down from generation to generation. We attach great importance
                to fresh, high-quality ingredients and authentic preparation
                methods.
              </p>

              <p>
                The heart of our restaurant is our traditional stone oven, where
                our pizzas are baked at perfect temperatures. We also serve fine
                wines from the best growing regions in Italy.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/photos/1000028487.jpg"
              alt="Carpe Diem Restaurant"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
