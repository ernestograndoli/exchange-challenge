interface IProps {
  label: string;
  showLoading?: boolean;
  onClick: () => void;
}

export default function Button(props: IProps) {
  const { label, showLoading = false, onClick } = props;

  return (
    <button
      type="button"
      className="btn btn-primary rounded-3 fw-bold fs-4 py-2 px-4"
      onClick={onClick}
      style={{ width: "169px!important", height: "54px!important" }}
    >
      {!showLoading ? (
        label
      ) : (
        <div className="spinner-border text-white">
          <span className="sr-only"></span>
        </div>
      )}
    </button>
  );
}
