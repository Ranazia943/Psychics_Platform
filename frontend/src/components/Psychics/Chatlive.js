import PsyMessageContainer from "./Psychicschat/PsyMessageContainer";
import PsySidebar from "./Psychicschat/PsySidebar";

const PsyHome = () => {
	return (
    <div className="row">
      <div className="col-md-2"></div>

      <div className="col-md-10">
        <main className="content">
          <div className="container p-auto">
            <div className="card">
              <div className="row g-0">
                <PsySidebar />
                <PsyMessageContainer />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default PsyHome;
