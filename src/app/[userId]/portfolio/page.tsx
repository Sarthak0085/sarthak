import { getPortfolio } from "@/actions/get-portfolio";
import { PortfolioForm } from "@/components/form/portfolio-form";
import { Portfolio } from "@/components/form/schema";

interface PortfolioPageProps {
    params: { userId: string };
}

export default async function PortfolioPage({ params }: PortfolioPageProps) {
    const portfolio = await getPortfolio(params.userId);
    console.log(portfolio);
    // const portfolio = null;

    return (
        <PortfolioForm portfolio={portfolio?.data as unknown as Portfolio} />
    )
}