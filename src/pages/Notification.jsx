export default function Notification() {
  return (
    <div className="flex flex col my-[50px] p-2">
      <div className="flex items-center w-full">
        <img className="w-8 h-8 object-contain" src="https://cdn2.iconfinder.com/data/icons/alert-message/64/bell-alert-exclamation-icon-48.png" alt="" />
        <div className="pl-2 w-full">
          <h3>Purchase Update</h3>
          <p className="text-xs">
            Feature to be implemented very soon. Stay Put
          </p>
          <p className="text-right text-xs">12.23.23 12:34:34</p>
        </div>
      </div>
    </div>
  );
}
