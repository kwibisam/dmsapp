import NavBar from "@/components/NavBar";

export default function DashboardLayout ({children}) {
    return(
        <div>
            <NavBar className="absolute top-0 bottom-0 left-0 w-60"/>
            <div className="ml-60">
                {children}
            </div>
        </div>
    ) 
}